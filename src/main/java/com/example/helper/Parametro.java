/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.helper;

/**
 *
 * @author MMarquez
 */
public class Parametro {
    private String nombre;
    private String tipo;
    private String valor;
    private boolean es_out;

    public Parametro() {
    }
    
    
    public Parametro(String nombre, String tipo, String valor, boolean es_out) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.es_out = es_out;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public boolean isEs_out() {
        return es_out;
    }

    public void setEs_out(boolean es_out) {
        this.es_out = es_out;
    }
    
    
    
}