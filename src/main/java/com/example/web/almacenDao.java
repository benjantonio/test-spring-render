/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.web;

import com.example.domain.individuoDto;
import com.example.helper.DBHelper;
import com.example.helper.Parametro;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.CachedRowSet;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *
 * @author Gonzalo
 */
public class almacenDao {
    
    private static Log _log = LogFactory.getLog(almacenDao.class);
    
    public static int Guardar_Individuo(individuoDto individuo)
    {
        ArrayList parametros = new ArrayList();
        parametros.add(new Parametro("p_nombre", "String", individuo.getNombre(), false));
        parametros.add(new Parametro("p_apellido", "String", individuo.getApellido(), false));        
        parametros.add(new Parametro("p_edad", "int", individuo.getEdad(), false));
        parametros.add(new Parametro("p_correo", "String", individuo.getCorreo(), false));
        parametros.add(new Parametro("p_telefono", "String", individuo.getTelefono(), false));
        return Escalar("call SP_Guardar_Individuo(?,?,?,?,?)", parametros);
    }     
    
    public static ArrayList Listar_Individuos()
    {
        ArrayList parametros = new ArrayList();
        return ListaEntidad("call SP_Listar_Individuos()", parametros);
    }
        
    private static ArrayList ListaEntidad(String query, List parametros)
    {
        ArrayList lista = new ArrayList();
        individuoDto aux = null;
        try{
            
            DBHelper dbh = new DBHelper();
            CachedRowSet crs=(CachedRowSet) dbh.listar(query, parametros);
            ResultSetMetaData meta = crs.getMetaData();
            int numCol = meta.getColumnCount();
            boolean extra_col = false;
            for (int i = 1; i < numCol+1; i++) 
            {
                if(meta.getColumnName(i).equals("direccion")){
                    extra_col = true;
                    break;
                }

            }         
            while(crs.next()) {
                aux = new individuoDto();
                aux.setNombre(crs.getString("nombre"));   
                aux.setApellido(crs.getString("apellido"));   
                aux.setEdad(crs.getString("edad"));                                 
                aux.setCorreo(crs.getString("correo"));                    
                aux.setTelefono(crs.getString("telefono"));  
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
            lista.add(new individuoDto());
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
