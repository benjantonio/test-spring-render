
package com.example.web;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.dao.LogDao;
import com.example.dto.LogDto;
import java.util.Collections;
import static java.util.Collections.reverse;
import java.util.Locale;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
/**
 *
 * @author Benjantonio
 */

@Controller
public class ControladorREST {
    
    @Autowired
    private LogDao individuoDao;
    
    @GetMapping("/")
    public String comienzo(Model model){
        
        return "indice";
    }
    
    @PostMapping("/guardar-ip")
    public String guardarIP(@RequestParam String ip,  Model model) {
      
        Locale locale = Locale.getDefault();
        String country = locale.getCountry();
        
        LogDto ind = new LogDto();
        
        ind.setIp(ip);
        ind.setZona(country);
        ind.setHora("500");
        
        almacenDao.Guardar_Log(ind);
        
          // Obtener la lista de individuos nuevamente
    ArrayList<LogDto> listaIndividuos = almacenDao.Listar_Logs();
    Collections.reverse(listaIndividuos);
    
    // Añadir la lista de individuos al modelo
    model.addAttribute("individuos", listaIndividuos);
        
        return "indice";
    }
    
}
