package com.ecommerce.online_shopping.item;

import com.ecommerce.online_shopping.common.CommonResponse;
import com.ecommerce.online_shopping.item.dto.ItemReqDto;
import com.ecommerce.online_shopping.item.dto.ItemResDto;
import com.ecommerce.online_shopping.item.dto.ItemSearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemResDto>> items(ItemSearchDto itemSearchDto, Pageable pageable) {
        List<ItemResDto> itemResDtos = itemService.findAll(itemSearchDto, pageable);
        return new ResponseEntity<>(itemResDtos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/item/create")
    public ResponseEntity<CommonResponse> itemCreate(ItemReqDto itemReqDto) {
        Item item = itemService.create(itemReqDto);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.CREATED, "아이템이 추가되었어요!", item), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/item/{id}/delete")
    public ResponseEntity<CommonResponse> delete(@PathVariable Long id) {
        Item item = itemService.delete(id);
        return new ResponseEntity<>(new CommonResponse(HttpStatus.OK, "아이템이 삭제되었어요!", item), HttpStatus.OK);
    }

    @GetMapping("/item/{id}/image")
    public ResponseEntity<Resource> getImage(@PathVariable Long id) {
        Resource resource = itemService.getImage(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity <>(resource, headers, HttpStatus.OK);
    }

}
