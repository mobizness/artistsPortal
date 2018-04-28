package com.pacegallery.portal.artist.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class DropboxFile {
    @Id
    private String key;
    @NotNull
    @Size(min = 3)
    private String artistKey;
    @NotNull
    @Size(min = 1)
    private String name;
    private Date uploaded = new Date();
    private Date lastAccessed;
}
