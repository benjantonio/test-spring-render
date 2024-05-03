/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dao;

import com.example.dto.ComunaDto;
import com.example.dto.UsuarioDto;
import com.example.helper.DBHelper;
import com.example.helper.Parametro;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.CachedRowSet;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Benjantonio
 */
@Repository
public interface UsuarioDao {

    Log _log = LogFactory.getLog(UsuarioDao.class);

    public static int Guardar_Usuario(UsuarioDto user) {
        ArrayList parametros = new ArrayList();
        parametros.add(new Parametro("p_username", "String", user.getUsername(), false));
        parametros.add(new Parametro("p_password", "String", user.getPassword(), false));
        parametros.add(new Parametro("p_email", "String", user.getEmail(), false));
        parametros.add(new Parametro("p_nombres", "String", user.getNombres(), false));
        parametros.add(new Parametro("p_apellidos", "String", user.getApellidos(), false));
        parametros.add(new Parametro("p_edad", "int", String.valueOf(user.getEdad()), false));
        parametros.add(new Parametro("p_celular", "int", String.valueOf(user.getCelular()), false));
        parametros.add(new Parametro("p_direccion", "String", user.getDireccion(), false));
        parametros.add(new Parametro("p_comuna", "int", String.valueOf(user.getComuna()), false));
        parametros.add(new Parametro("p_perfil", "int", String.valueOf(user.getPerfil()), false));
        parametros.add(new Parametro("p_usuario_activo", "int", String.valueOf(user.getUsuarioActivo()), false));
        parametros.add(new Parametro("p_usuario_administrador", "int", String.valueOf(user.getUsuarioAdministrador()), false));
        return Escalar("call SP_Guardar_Usuario(?,?,?,?,?,?,?,?,?,?,?,?)", parametros);
    }

    /*
    public static int Borrar_Log()
    {
        ArrayList parametros = new ArrayList();
        return Escalar("call SP_Borrar_Log()", parametros);
    }  
    
     */
    public static UsuarioDto Log_User(UsuarioDto user) {
        ArrayList parametros = new ArrayList();
        parametros.add(new Parametro("p_username", "String", user.getUsername(), false));        
        parametros.add(new Parametro("p_password", "String", user.getPassword(), false));
        return (UsuarioDto)ListaEntidad("call SP_Log_User(?,?)", parametros).get(0);
    }
    
    
    public static ArrayList Listar_Comunas() {
        ArrayList parametros = new ArrayList();
        return ListaEntidad("call SP_Listar_Comunas()", parametros);
    }

    private static ArrayList ListaEntidad(String query, List parametros) {
        ArrayList lista = new ArrayList();
        UsuarioDto aux = null;
        try {

            DBHelper dbh = new DBHelper();
            CachedRowSet crs = (CachedRowSet) dbh.listar(query, parametros);

            while (crs.next()) {
                aux = new UsuarioDto();
                aux.setIdUsuario(crs.getInt("id_usuario"));
                aux.setUsername(crs.getString("username"));
                aux.setPassword(crs.getString("password"));
                aux.setEmail(crs.getString("email"));
                aux.setNombres(crs.getString("nombres"));
                aux.setApellidos(crs.getString("apellidos"));
                aux.setEdad(crs.getInt("edad"));
                aux.setCelular(crs.getInt("celular"));
                aux.setDireccion(crs.getString("direccion"));
                aux.setComuna(crs.getInt("comuna"));
                aux.setPerfil(crs.getInt("perfil"));
                aux.setUsuarioActivo(crs.getInt("usuario_activo"));
                aux.setUsuarioAdministrador(crs.getInt("usuario_administrador"));
                lista.add(aux);
                lista.add(aux);
            }
            crs.close();

        } catch (SQLException e) {
            _log.error(e);
            System.out.println(e);
        } finally {

        }

        if (lista.isEmpty()) {
            lista.add(new UsuarioDto());
        }
        return lista;
    }

    private static int Escalar(String query, List parametros) {
        int id = 0;
        try {

            DBHelper dbh = new DBHelper();
            id = dbh.obtenerEscalar(query, parametros);

        } catch (Exception e) {
            _log.error(e);
            System.out.println(e);
        } finally {

        }

        return id;
    }

}
