# 💳 Integracion de pagos Khipu 
Este proyecto es una aplicación Node.js con Express y frontend HTML/CSS/JS, que se conecta con la API de [Khipu](https://khipu.com) para realizar las siguientes acciones:

- Obtener bancos disponibles.
- Crear un pago.
- Obtener detalle de un pago por ID.
- Eliminar un pago.

---

## 🚀 Requisitos

- Node.js (v14 o superior)
- NPM
- Una cuenta en Khipu con acceso a las credenciales de API

---



## ⚙️ Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/martin241125/khipu-integration.git
cd khapi-integration

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno en un archivo `.env`:**

```env
RECEIVER_ID=tu_receiver_id
SECRET=tu_api_key
```

4. **Ejecuta el servidor:**

```bash
npm start
```

Luego, abre tu navegador en: [http://localhost:3000]

---

## 🧪 Funcionalidad del Proyecto

Desde la interfaz web (`/public/index.html`) puedes realizar las siguientes acciones:

### ✅ Obtener Bancos

Al hacer clic en **"Traer bancos"**, se consulta la API de Khipu y se muestran tarjetas con el nombre, ID y código de cada banco disponible.

### 💰 Crear un Pago

Rellena los campos **amount**, **currency** y **subject**.

Al hacer clic en **"Crear pago"**, se genera una nueva transacción y se muestra una tarjeta con la **URL del pago** y su **ID**.

### 🔎 Buscar Pago por ID

Ingresa un `payment_id` existente en el input correspondiente.

Al hacer clic en **"Buscar pago"**, se muestran los detalles del pago: **estado**, **monto**, **moneda** y **asunto**.

### ❌ Eliminar un Pago

Ingresa el `payment_id` y presiona **"Eliminar pago"**.

Si el pago se elimina correctamente, se muestra una tarjeta de confirmación en **rojo**.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.