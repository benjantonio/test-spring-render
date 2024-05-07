
package com.example.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.ServletException;
import java.io.IOException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
/**
 *
 * @author Benjantonio
 */

@Controller
@RequestMapping({"/","/home","/status"})
public class ControladorREST {
    
    @GetMapping("/")
    public String comienzo(Model model,HttpServletRequest request){
        
        return "home";
    }
    
    @RequestMapping(value = "/redirect/{opt}", method = RequestMethod.GET)
    public String redirect(HttpServletRequest request, @PathVariable(value="opt") String seleccion)
        throws IOException, ServletException{
        
        System.out.println("seleccion es: "+seleccion);
        
        if(seleccion.equalsIgnoreCase("login") ){
            seleccion = "registration/login";
        }else if(seleccion.equalsIgnoreCase("registro")){
            seleccion = "registration/registro";
        }
        
        return seleccion;
    }
    
}
