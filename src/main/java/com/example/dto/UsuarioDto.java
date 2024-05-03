/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dto;

/**
 *
 * @author Benjantonio
 */
public class UsuarioDto {

    private int idUsuario;
    private String username;
    private String password;
    private String email;
    private String nombres;
    private String apellidos;
    private int edad;
    private int celular;
    private String direccion;
    private int comuna;
    private int perfil;
    private int usuarioActivo;
    private int usuarioAdministrador;

    public UsuarioDto() {
        this.idUsuario = 0;
        this.username = "";
        this.password = "";
        this.email = "";
        this.nombres = "";
        this.apellidos = "";
        this.edad = 0;
        this.celular = 0;
        this.direccion = "";
        this.comuna = 0;
        this.perfil = 0;
        this.usuarioActivo = 0;
        this.usuarioAdministrador = 0;
    }

    public UsuarioDto(int idUsuario, String username, String password, String email, String nombres, String apellidos, int edad, int celular, String direccion, int comuna, int perfil, int usuarioActivo, int usuarioAdministrador) {
        this.idUsuario = idUsuario;
        this.username = username;
        this.password = password;
        this.email = email;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.celular = celular;
        this.direccion = direccion;
        this.comuna = comuna;
        this.perfil = perfil;
        this.usuarioActivo = usuarioActivo;
        this.usuarioAdministrador = usuarioAdministrador;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public int getCelular() {
        return celular;
    }

    public void setCelular(int celular) {
        this.celular = celular;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getComuna() {
        return comuna;
    }

    public void setComuna(int comuna) {
        this.comuna = comuna;
    }

    public int getPerfil() {
        return perfil;
    }

    public void setPerfil(int perfil) {
        this.perfil = perfil;
    }

    public int getUsuarioActivo() {
        return usuarioActivo;
    }

    public void setUsuarioActivo(int usuarioActivo) {
        this.usuarioActivo = usuarioActivo;
    }

    public int getUsuarioAdministrador() {
        return usuarioAdministrador;
    }

    public void setUsuarioAdministrador(int usuarioAdministrador) {
        this.usuarioAdministrador = usuarioAdministrador;
    }
    
    
    

}
