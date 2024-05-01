/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
package com.example.helper;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;

public class DBHelper {
    
    
    public ResultSet listar(String query, List parametros){
        
        Connection conn = null;
        CallableStatement ps = null;
        ResultSet rs = null;
        CachedRowSet crs = null;
        RowSetFactory factory = null;
        
        try {
            
            //conn = GlobalPool.getConnection("ECOMMERCE");
            conn = DBConnectionPool.getInstance().getConnection();
            ps = conn.prepareCall(query);
            
            if(parametros != null){
                
                ps=setParametros(ps, parametros);
                
            }
            
            rs = ps.executeQuery();
            factory = RowSetProvider.newFactory();
            crs = factory.createCachedRowSet();
            crs.populate(rs);
            
        } catch (Exception ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if (rs != null) {
                    try {
                        rs.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (ps != null) {
                    try {
                        ps.close();                        
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (conn != null)  {
                    try {                        
                        conn.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
            } catch (Exception e) {
                Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        
        return crs;
    }
    
    public ResultSet obtenerEntidad(String query, List parametros){
        
        Connection conn = null;
        CallableStatement ps = null;
        ResultSet rs = null;
        CachedRowSet crs = null;
        RowSetFactory factory = null;
        
        try {
            //conn = GlobalPool.getConnection("ECOMMERCE");
            conn = DBConnectionPool.getInstance().getConnection();
            ps = conn.prepareCall(query);
            
            if(parametros != null){
                
                ps=setParametros(ps, parametros);
                
            }
            
            rs = ps.executeQuery();
            factory = RowSetProvider.newFactory();
            crs = factory.createCachedRowSet();
            crs.populate(rs);
            
        } catch (Exception ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if (rs != null) {
                    try {
                        rs.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (ps != null) {
                    try {
                        ps.close();                        
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (conn != null)  {
                    try {                                                
                        conn.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
            } catch (Exception e) {
                Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
            }
            
            
        }
        
        return crs;
    }
    
    public int obtenerEscalar(String query, List parametros){
        
        Connection conn = null;
        CallableStatement ps = null;
        ResultSet rs = null;
        int respuesta = -1;
        
        try {
            //conn = GlobalPool.getConnection("ECOMMERCE");
            conn = DBConnectionPool.getInstance().getConnection();
            ps = conn.prepareCall(query);
            
            if(parametros != null){
                ps=setParametros(ps, parametros);
                
            }
            
            rs = ps.executeQuery();
            while(rs.next()) {
                respuesta = rs.getInt(1);
            }  
            
        } catch (SQLException ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if (rs != null) {
                    try {
                        rs.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (ps != null) {
                    try {
                        ps.close();                        
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (conn != null) {
                    try {
                        conn.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
            } catch (Exception e) {
                Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        
        return respuesta;
    }   
    
    public CallableStatement setParametros(CallableStatement ps, List parametros){
        
        for(int i =0; i<parametros.size();i++){
            try {
                Parametro p = new Parametro();
                p=(Parametro) parametros.get(i);
                
                switch(p.getTipo()){
                    case "String":
                        ps.setString(i+1, p.getValor());
                        break;
                    case "int":
                        ps.setInt(i+1, Integer.parseInt(p.getValor()));
                        break;
                    case "float":
                        ps.setFloat(i+1, Float.parseFloat(p.getValor()));
                        break;
                    case "Date":
                        ps.setDate(i+1, Date.valueOf(p.getValor()));
                        break;
                    default:
                        break;
                }
            } catch (SQLException ex) {
                Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        
        return ps;
    }        
    
      public int setStatus(String query){
        
        Connection conn = null;
        CallableStatement ps = null;
        ResultSet rs = null;
        int respuesta = -1;
        
        try {
           
            conn = DBConnectionPool.getInstance().getConnection();
           
            ps = conn.prepareCall(query);
                                             
            rs = ps.executeQuery();
            while(rs.next()) {
                respuesta = rs.getInt(1);
            }  
            
        } catch (SQLException ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try {
                if (rs != null) {
                    try {
                        rs.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
                if (conn != null) {
                    try {
                        ps.close();
                        conn.close();
                    } catch (Exception e) {
                        Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
                    }
                }
                
            } catch (Exception e) {
                Logger.getLogger(DBHelper.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        
        return respuesta;
    }   
}
