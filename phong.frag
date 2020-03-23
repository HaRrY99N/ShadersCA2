#version 430

in vec3 vertPos;
in vec3 N;
in vec3 lightPos;
/* TODO:: Complete your shader code for a full Phong shading */ 


uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity
uniform vec3 Ks;			// spectre reflectivity
uniform vec3 Ls;			// spectre light intensity
uniform vec3 Ka;			// ambient reflectivity
uniform vec3 La;			// ambient light intensity

vec4 Ia;
vec4 Is;
vec4 Id;

// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;


out vec3 theColour;

void ambientLight() 
{
	Ia = vec4(La,1.0);
   Ia = clamp(Ia, 0.0, 1.0);
}
vec3 spectreLight()
{

	Is = vec4(Ls,1.0);
    Is = clamp(Is, 0.0,1.0);
    //Multiply the Reflectivity by the Diffuse intensity
	
	
	vec3 L =normalize(lightPos - vertPos);
	float specularStrength = 0.5;
	vec3 viewDir = normalize(lightPos - vertPos);
	vec3 reflectDir = reflect(-L, N);
	float spec = pow(max(dot(viewDir, reflectDir),0.0),32);
	vec3 specular = specularStrength * spec * Ls;
	return specular;
}

void diffuseLight()
{
	 //Calculate the light vector
   vec3 L = normalize(lightPos - vertPos);  //finds the firection of the light

   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1
   Id = vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?
   Id = clamp(Id, 0.0, 1.0); // What is the role of clamp function? Why do we need it? 
}

void main() {

	
	ambientLight();
	diffuseLight();
	spectreLight();
	
	
	FragColour = vec4(Kd,1.0) * Id + vec4(Ka,1.0) * Ia + vec4(spectreLight(),1.0) * Is;
}

