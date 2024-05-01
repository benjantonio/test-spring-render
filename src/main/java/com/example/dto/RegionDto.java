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
public class RegionDto implements Serializable {

    private int id_region;
    private String nombre_region;

    public RegionDto() {
        this.id_region = 0;
        this.nombre_region = "";

    }

    public RegionDto(int id_region, String nombre_region) {
        this.id_region = id_region;
        this.nombre_region = nombre_region;
    }

    public int getId_region() {
        return id_region;
    }

    public void setId_region(int id_region) {
        this.id_region = id_region;
    }

    public String getNombre_region() {
        return nombre_region;
    }

    public void setNombre_region(String nombre_region) {
        this.nombre_region = nombre_region;
    }

    
}
