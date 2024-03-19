
package com.example.web;

import com.example.dao.individuoDao;
import com.example.domain.individuoDto;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
/**
 *
 * @author Benjantonio
 */

@Controller
public class ControladorREST {
    
    @Autowired
    private individuoDao individuoDao;
    
    @GetMapping("/")
    public String comienzo(Model model){
        
        //Iterable<individuoDto> individuos = individuoDao.findAll();

        System.out.println("Ejecutando SP");
        
        individuoDto ind = new individuoDto();
        
        ind.setNombre("Test1");
        ind.setApellido("Test1");
        ind.setEdad("50");
        ind.setCorreo("Test1");
        ind.setTelefono("123");
        
        almacenDao.Guardar_Individuo(ind);
        ArrayList<individuoDto> listaIndividuos = almacenDao.Listar_Individuos();
        
        System.out.println("SP Ejecutado.");
        
        model.addAttribute("individuos",listaIndividuos);
        return "indice";
    }
    
}
