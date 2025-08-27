# Pruebas Automatizadas con Playwright

## Descripción
Este proyecto contiene pruebas automatizadas para aplicaciones web utilizando Playwright y Python.
Las pruebas siguen historias de usuario y criterios de aceptación, con trazabilidad clara para cada test.

## Estructura de los scripts

```text
tests/
├─ test_login.py
├─ test_cart.py
└─ test_checkout.py
```

## Trazabilidad de Pruebas

| Historia | Criterio | Test | Ubicación |
|----------|----------|------|-----------|
| HU-01 Login | Usuario puede loguearse con credenciales válidas | test_login.py | `/tests/test_login.py` |
| HU-02 Carrito | Usuario puede agregar producto al carrito | test_cart.py | `/tests/test_cart.py` |
| HU-03 Checkout | Usuario puede completar la compra | test_checkout.py | `/tests/test_checkout.py` |

> Nota: Los resultados de las pruebas se actualizarán continuamente con cada ejecución.

## Instalación

```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno virtual
# En Windows
venv\Scripts\activate

# En Linux / MacOS
source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Instalar navegadores de Playwright
playwright install
