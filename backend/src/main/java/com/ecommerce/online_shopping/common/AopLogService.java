package com.ecommerce.online_shopping.common;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
@Aspect
@Component
@Slf4j
public class AopLogService {
    @Pointcut("within(@org.springframework.stereotype.Controller *)")
    public void controllerPointCut() {
    }

    @Before("controllerPointCut()")
//    @Order(1)
    public void beforeController(JoinPoint joinPoint) {
        ServletRequestAttributes servletRequestAttributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest req = servletRequestAttributes.getRequest();

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("Method Name", joinPoint.getSignature().getName());
        objectNode.put("CRUD NAME", req.getMethod());

        Map<String, String[]> paramMap = req.getParameterMap();
        ObjectNode objectNodeDetail = objectMapper.valueToTree(paramMap);
        objectNode.set("user inputs", objectNodeDetail);
        log.info("user request info" + objectNode);
    }

    @After("controllerPointCut()")
//    @Order(3)
    public void afterController() {
        log.info("end controller");
    }
}
