/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dto;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.Data;

/**
 *
 * @author Benjantonio
 */
public class ComunaDto implements Serializable{
    
    private int id_comuna;
    private String nombre_comuna;
    private int id_region;

    public ComunaDto() {
        this.id_comuna = 0;
        this.nombre_comuna = "";
        this.id_region = 0;
    }

    public ComunaDto(int id_comuna, String nombre_comuna, int id_region) {
        this.id_comuna = id_comuna;
        this.nombre_comuna = nombre_comuna;
        this.id_region = id_region;
    }

    public int getId_comuna() {
        return id_comuna;
    }

    public void setId_comuna(int id_comuna) {
        this.id_comuna = id_comuna;
    }

    public String getNombre_comuna() {
        return nombre_comuna;
    }

    public void setNombre_comuna(String nombre_comuna) {
        this.nombre_comuna = nombre_comuna;
    }

    public int getId_region() {
        return id_region;
    }

    public void setId_region(int id_region) {
        this.id_region = id_region;
    }

    

    
}


