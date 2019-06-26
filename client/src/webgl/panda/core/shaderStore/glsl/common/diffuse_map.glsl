#ifdef USE_DIFFUSE_MAP
uniform sampler2D diffuse_map;
#elif defined( USE_DIFFUSE_MAP_CUBE )
uniform samplerCube diffuse_map;
#endif
