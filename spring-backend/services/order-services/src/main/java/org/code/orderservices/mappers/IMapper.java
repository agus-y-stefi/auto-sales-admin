package org.code.orderservices.mappers;

public interface IMapper<T,Q,R>{
    T toEntity(Q request);
    R toResponse(T entity);
}
