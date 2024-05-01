/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Benjantonio
 */
@Controller
@RequestMapping("/user")
public class userController {
    
    @RequestMapping(value = "/redirect/{opt}", method = RequestMethod.GET)
    public String redirect(HttpServletRequest request, @PathVariable(value="opt") String seleccion)
        throws IOException, ServletException{
        
        return seleccion;
    }
    
}
