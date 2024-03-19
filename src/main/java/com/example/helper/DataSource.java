/*
 *
 *
 */
package com.example.helper;

/**
 * DataSource: Clase que establece el pool de conexiones
 */

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.*;
import org.apache.commons.dbcp2.BasicDataSource;

public class DataSource {

    private static DataSource     datasource;
    private BasicDataSource ds;

    private DataSource() throws IOException, SQLException, PropertyVetoException {
        
        //ResourceBundle bundle = ResourceBundle.getBundle("/bdconfig");
        ds = new BasicDataSource();
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver"); 
        ds.setUsername("avnadmin");  
        ds.setPassword("AVNS_uKxPI7VzGZFYFXrXwV4");  
        ds.setUrl("jdbc:mysql://avnadmin:AVNS_uKxPI7VzGZFYFXrXwV4@test-proyecto-benjamin-test.a.aivencloud.com:26019/test?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true");  
       
     // the settings below are optional -- dbcp can work with defaults
        ds.setMinIdle(1);
        ds.setMaxIdle(1000);
        //ds.setMaxOpenPreparedStatements(180);

    }

    public static DataSource getInstance() throws IOException, SQLException, PropertyVetoException {
        if (datasource == null) {
            datasource = new DataSource();
            return datasource;
        } else {
            return datasource;
        }
    }

    public Connection getConnection() throws SQLException {
        return this.ds.getConnection();
    }

}
