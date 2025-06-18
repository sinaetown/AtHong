package com.ecommerce.online_shopping.item;

import com.ecommerce.online_shopping.item.dto.ItemReqDto;
import com.ecommerce.online_shopping.item.dto.ItemResDto;
import com.ecommerce.online_shopping.item.dto.ItemSearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ItemResDto> findAll(ItemSearchDto itemSearchDto, Pageable pageable) {
        Specification<Item> spec = new Specification<Item>() {
            @Override
            public Predicate toPredicate(Root<Item> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                if (itemSearchDto.getName() != null) {
                    predicates.add(criteriaBuilder.like(root.get("name"),
                            "%" + itemSearchDto.getName() + "%"));
                }
                if (itemSearchDto.getCategory() != null) {
                    predicates.add(criteriaBuilder.like(root.get("category"),
                            "%" + itemSearchDto.getCategory() + "%"));
                }
                predicates.add(criteriaBuilder.equal(root.get("delYn"), "N"));
                Predicate[] predicateArr = new Predicate[predicates.size()];
                for (int i = 0; i < predicates.size(); i++) {
                    predicateArr[i] = predicates.get(i);
                }
                Predicate predicate = criteriaBuilder.and(predicateArr);
                return predicate;
            }
        };
        Page<Item> items = itemRepository.findAll(spec, pageable);
        List<Item> itemList = items.getContent();
        List<ItemResDto> itemResDtos = itemList.stream().map(m -> ItemResDto.builder()
                .id(m.getId())
                .name(m.getName())
                .category(m.getCategory())
                .price(m.getPrice())
                .stockQuantity(m.getStockQuantity())
                .build()).collect(Collectors.toList());
        return itemResDtos;
    }

    public Item create(ItemReqDto itemReqDto) {
        MultipartFile multipartFile = itemReqDto.getItemImage();
        String fileName = multipartFile.getOriginalFilename();

        Item new_item = Item.builder()
                .name(itemReqDto.getName())
                .category(itemReqDto.getCategory())
                .price(itemReqDto.getPrice())
                .stockQuantity(itemReqDto.getStockQuantity())
                .build();
        Item item = itemRepository.save(new_item);
        Path path = Paths.get("/Users/sinaehong/tmp", item.getId() + "_" + fileName);
        item.setImagePath(path.toString());
        try {
            byte[] bytes = multipartFile.getBytes(); //이미지 파일을 바이트로 변환해서 write 하겠다
            Files.write(path, bytes, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
        } catch (IOException e) { // checked exception은 예외처리를 해줘야 한다
            throw new IllegalArgumentException("Image is unavailable.");
        }
        return item;
    }

    public Item delete(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("해당 ID를 가진 아이템이 존재하지 않아요."));
        itemRepository.delete(item);
        return item;
    }

    public Resource getImage(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Item cannot be found."));
        String imagePath = item.getImagePath();
        Path path = Paths.get(imagePath);
        Resource resource;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("URL form is invalid.");
        }
        return resource;
    }
}
