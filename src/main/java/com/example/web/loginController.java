/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.web;

import com.example.dao.ComunaDao;
import com.example.dao.UsuarioDao;
import com.example.dto.ComunaDto;
import com.example.dto.UsuarioDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Benjantonio
 */
@Controller
@RequestMapping("/login")
public class loginController {

    private static Log _log = LogFactory.getLog(loginController.class);

    @RequestMapping(value = "/redirect/{opt}", method = RequestMethod.GET)
    public String redirect(HttpServletRequest request, @PathVariable(value = "opt") String seleccion)
            throws IOException, ServletException {

        switch (seleccion) {
            case "login":
                System.out.println("======== ENTRÉ A LOGIN ========");
                break;
            case "registro":
                System.out.println("======== ENTRÉ A REGISTRO ========");

                ArrayList<ComunaDto> listaComunas = new ArrayList();

                listaComunas = ComunaDao.Listar_Comunas();

                request.setAttribute("listaComunas", listaComunas);
                break;
            default:
                throw new AssertionError();
        }

        return seleccion;
    }

    @RequestMapping(value = "/registrarUsuario", method = RequestMethod.POST)
    public void registrarUsuario(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
     
        //Inicio variables
        JSONObject json = new JSONObject();

        String resultado = "";
        try {
            System.out.println("hola entré a registrarUsuario");

            String usuario = request.getParameter("usuario");
            String password = request.getParameter("password");
            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String celular = request.getParameter("celular");
            String correo = request.getParameter("correo");
            int edad = Integer.parseInt(request.getParameter("edad"));
            String direccion = request.getParameter("direccion");
            int perfil = Integer.parseInt(request.getParameter("perfil"));
            int comuna = Integer.parseInt(request.getParameter("comuna"));
            
            
            UsuarioDto us = new UsuarioDto();
            
            us.setUsername(usuario);
            us.setNombres(nombre);
            us.setApellidos(apellido);
            us.setCelular(Integer.parseInt(celular));
            us.setEmail(correo);
            us.setEdad(edad);
            us.setDireccion(direccion);
            us.setPerfil(perfil);
            us.setComuna(comuna);
            
            int idUserNew = UsuarioDao.Guardar_Usuario(us);

            resultado = "S , Guardado con éxito.";
            
            json.put("resultado", resultado);
            json.put("idUserNew", idUserNew);
            //json.put("listaPetSerie", listaPetSerie);
            PrintWriter out = response.getWriter();
            out.println(json);
            out.flush();

        } catch (JSONException | IOException e) {
            //avisoMsg.setMensaje("Error al cargar el historial.");
            //avisoMsg.setTipo("E");
            //request.setAttribute("avisoMsg", avisoMsg);
            _log.error(e);
        }
    }

}
