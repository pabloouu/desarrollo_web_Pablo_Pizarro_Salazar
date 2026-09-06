Acá iran mis decisiones de diseño

Decidí que el formato de la página se adapte al tamaño de la pantalla, por ello el "content=width=device-width, initial-scale=1.0" en el meta tag

Enfatizar en la seccion de informar avistamientos que se deben adjuntar evidencias para validarlas (darle más peso semántico a ese punto).

Agregué un div que agrupe main y aside para pdoer modificar esos dos bloques en especifico y no a todo el body.

Decido dejar el name puesto, ya que semanticamente es correcto por más que no se use en esta entrega.

Los required son solo refuerzo semantico visual para ir guiandome qué campos son obligatorios

nuevo-avistamiento se rige bajo las mismas normas.

Para prototipar los avistamientos le pedi a la IA que me generara una lista con avistamientos ficticios

Agrego un small class a cada uno de los campos de los formularios como ayuda visual e informativa al cliente/usuario.

Pasamos a los estilo css de momento, en donde escribiré primeros los selectores que quiero que se vean afectados. Los media queries añadidos al final del documento estilos.css sirven para tomar medidas cuando la ventana mide 800px o menos. El resto de "situiaciones" las "decide" la pagina, adaptandose al tamaño de la pantalla en donde se ve, esto lo resuelven los max-width, flex-wrap y el auto-fit definidos antes.

Ahora continuamos con los .js, específicamente viendo el de las regiones, en donde, con ayuda de la IA agrupe las regiones con sus respectivas comunas (puesto que claramente no conozco todas las comunas existentes). 