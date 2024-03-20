/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.dao;

import com.example.dto.LogDto;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Benjantonio
 */
public interface LogDao extends CrudRepository<LogDto, Long>{
    
}
