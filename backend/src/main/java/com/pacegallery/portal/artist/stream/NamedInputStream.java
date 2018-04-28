package com.pacegallery.portal.artist.stream;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.InputStream;

@Data
@AllArgsConstructor
public class NamedInputStream {
    private String name;
    private InputStream inputStream;
}
