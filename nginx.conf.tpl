{# base config comes from base docker image #}
{% extends "nginx.conf.base.tpl" %}

{% set throttling_api_burst = '15' -%}

{% block custom_locations %}
     # nginx resolves variables differently than just static values and respects dns ttl
     set $jasper_dynamic_endpoint http://{{GATEWAY_HOST}}:{{GATEWAY_PORT}};
     location ^~ /jasperserver-pro {

          limit_req zone=api burst=20;

          {% if CORS_ALL_ALLOWED == 'true' %}
          add_header 'Access-Control-Allow-Origin' '$cors_origin' always;
          add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, PATCH, DELETE, OPTIONS' always;
          add_header 'Access-Control-Allow-Credentials' 'true' always;
          add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With,App-Version' always;
          {% endif %}

          proxy_pass $jasper_dynamic_endpoint;
          proxy_set_header X-Forwarded-Host $host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_redirect off;

         rewrite ^(/.*)$ $1 break;
     }
{% endblock %}
