#ifdef USE_SPECULAR_MAP
uniform sampler2D specular_map;
#elif defined( USE_SPECULAR_MAP_CUBE )
uniform samplerCube specular_map;
#endif
