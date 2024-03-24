/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dao;

import com.example.dto.logDto;
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
public interface logDao extends CrudRepository<logDto, Long> {
    
    Log _log = LogFactory.getLog(logDao.class);
     
    public static int Guardar_Log(logDto log)
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
        logDto aux = null;
        try{
            
            DBHelper dbh = new DBHelper();
            CachedRowSet crs=(CachedRowSet) dbh.listar(query, parametros);
           
            while(crs.next()) {
                aux = new logDto();
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
            lista.add(new logDto());
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
