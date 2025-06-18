package com.ecommerce.online_shopping.order;

import com.ecommerce.online_shopping.order.domain.Ordering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Ordering, Long> {
    public List<Ordering> findByMemberId(Long id);
}
