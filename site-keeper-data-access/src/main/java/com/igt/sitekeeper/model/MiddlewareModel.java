package com.igt.sitekeeper.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "middleware")
@Data
public class MiddlewareModel extends BaseInventory{
}
