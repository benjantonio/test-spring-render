package com.example.helper;

//DataSource: Clase que establece el pool de conexiones

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.*;
import java.util.ResourceBundle;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.stereotype.Component;

@Component
public class DBConnectionPool {

    
    private static DBConnectionPool datasource;
    private BasicDataSource ds;

     // Constructor privado para crear una instancia única del pool de conexiones.
     // Carga las propiedades de conexión desde el archivo application.properties.
    private DBConnectionPool() throws IOException, SQLException, PropertyVetoException {
        
        ResourceBundle bundle = ResourceBundle.getBundle("application");
        
        ds = new BasicDataSource();
        ds.setDriverClassName(bundle.getString("spring.datasource.driver-class-name")); 
        ds.setUsername(bundle.getString("spring.datasource.username"));  
        ds.setPassword(bundle.getString("spring.datasource.password"));  
        ds.setUrl(bundle.getString("spring.datasource.url"));  
       
     // the settings below are optional -- dbcp can work with defaults
        ds.setMinIdle(1);
        ds.setMaxIdle(1000);
        //ds.setMaxOpenPreparedStatements(180);

    }

    // Obtiene una instancia única del pool de conexiones.
    public static DBConnectionPool getInstance() throws IOException, SQLException, PropertyVetoException {
        if (datasource == null) {
            datasource = new DBConnectionPool();
            return datasource;
        } else {
            return datasource;
        }
    }

    //Obtiene una conexión de la piscina de conexiones.
    public Connection getConnection() throws SQLException {
        return this.ds.getConnection();
    }

}
