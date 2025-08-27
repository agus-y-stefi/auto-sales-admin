# Archivo de configuración compartida para todas las pruebas
import pytest
import os
from playwright.sync_api import Page, Browser, BrowserContext

# Configuración que se ejecuta antes de cada prueba
@pytest.fixture(scope="function")
def page(page: Page):
    """
    Fixture que proporciona una página limpia para cada test.
    scope="function" significa que se crea una nueva página para cada prueba.
    """
    # Configurar viewport (tamaño de ventana) estándar
    page.set_viewport_size({"width": 1920, "height": 1080})
    
    # Configurar timeout por defecto (30 segundos)
    page.set_default_timeout(30000)
    
    # Devolver la página configurada a la prueba
    yield page

@pytest.fixture(scope="session")
def base_url():
    return "http://localhost:3000"

# Hook que se ejecuta después de cada prueba
@pytest.fixture(autouse=True)
def after_each(page: Page, request):
    """
    Se ejecuta automáticamente después de cada prueba.
    autouse=True significa que no necesitas llamarlo explícitamente.
    """
    yield  # Aquí se ejecuta la prueba
    
    # Si la prueba falló, tomar screenshot
    if request.node.rep_call.failed:
        screenshot_path = f"reports/screenshot_{request.node.name}.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot guardado en: {screenshot_path}")

@pytest.fixture(scope="session")
def base_url():
    # En CI, usar una URL de testing o mock
    if os.getenv("CI"):
        return "http://localhost:3000"  # O tu servidor de testing
    return "http://localhost:3000"