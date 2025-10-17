FROM  codercom/code-server:4.96.4

USER root
RUN apt-get update && \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# reverting back to coder user 
USER coder 
#exposed code-server,s default port
EXPOSE 8080

# start code-server on conatainer launch
CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "/tmp/boltify-worker"]

