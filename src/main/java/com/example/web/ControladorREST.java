
package com.example.web;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.dto.logDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import static java.util.Collections.reverse;
import java.util.Locale;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.example.dao.logDao;
/**
 *
 * @author Benjantonio
 */

@Controller
public class ControladorREST {
    
    @Autowired
    private logDao individuoDao;
    
    @GetMapping("/")
    public String comienzo(Model model,HttpServletRequest request){
        
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = request.getRemoteAddr();
        }
        
        Locale locale = Locale.getDefault();
        String country = locale.getCountry();
        
        logDto log = new logDto();
        log.setIp(ipAddress);
        log.setZona(country);
        log.setHora("500");
        logDao.Guardar_Log(log);
        
         // Obtener la lista de individuos nuevamente
        ArrayList<logDto> logs = logDao.Listar_Logs();
        Collections.reverse(logs);
        
        model.addAttribute("logs", logs);
        
        return "indice";
    }
    
}
