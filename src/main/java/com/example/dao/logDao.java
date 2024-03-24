/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dao;

import com.example.dto.LogDto;
import com.example.helper.DBHelper;
import com.example.helper.Parametro;
import com.example.web.almacenDao;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.CachedRowSet;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Benjantonio
 */
public interface LogDao extends CrudRepository<LogDto, Long>{
    
    Log _log = LogFactory.getLog(almacenDao.class);
    
    public static int Guardar_Log(LogDto log)
    {
        ArrayList parametros = new ArrayList();
        parametros.add(new Parametro("p_ip", "String", log.getIp(), false));
        parametros.add(new Parametro("p_zona", "String", log.getZona(), false));        
        parametros.add(new Parametro("p_hora", "String", log.getHora(), false));
        return Escalar("call SP_Guardar_Log(?,?,?)", parametros);
    }     
    
    public static ArrayList Listar_Logs()
    {
        ArrayList parametros = new ArrayList();
        return ListaEntidad("call SP_Listar_Log()", parametros);
    }
        
    private static ArrayList ListaEntidad(String query, List parametros)
    {
        ArrayList lista = new ArrayList();
        LogDto aux = null;
        try{
            
            DBHelper dbh = new DBHelper();
            CachedRowSet crs=(CachedRowSet) dbh.listar(query, parametros);
           
            while(crs.next()) {
                aux = new LogDto();
                aux.setIp(crs.getString("ip"));   
                aux.setZona(crs.getString("zona"));   
                aux.setHora(crs.getString("hora"));         
                lista.add(aux);
            }    
            crs.close();
            
        } catch (SQLException e) {
            _log.error(e);
            System.out.println(e);
        } finally {

        }
        
        if(lista.isEmpty())
        {
            lista.add(new LogDto());
        }
        return lista;
    } 
    
    private static int Escalar(String query, List parametros)
    {
        int id = 0;
        try{
            
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
