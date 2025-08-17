"""
Script de pruebas para verificar la visualización general del dashboard de órdenes.
Valida que la página principal carga correctamente y muestra los datos esperados.
"""

import pytest
from playwright.sync_api import Page, expect


class TestDashboardVisualization:
    """Clase de pruebas para la visualización general del dashboard"""
    
    def test_orders_page_loads_successfully(self, page: Page, base_url: str):
        """
        Verificar que la página /orders carga correctamente
        """
        # Navegar a la página de órdenes
        page.goto(f"{base_url}/orders")
        
        # Verificar que la página cargó exitosamente (código 200)
        expect(page).to_have_url(f"{base_url}/orders")
        
        # Verificar que el título de la página es correcto
        expect(page).to_have_title("Gestión de Ventas")
        
        # Esperar a que el contenido principal esté visible
        page.wait_for_load_state("networkidle")
        
    def test_orders_table_exists_and_has_correct_columns(self, page: Page, base_url: str):
        """
        Verificar que la tabla existe y tiene las columnas correctas
        """
        page.goto(f"{base_url}/orders")
        
        # Esperar a que la tabla esté presente
        table = page.locator("table, [data-testid='orders-table']")
        expect(table).to_be_visible()
        
        # Verificar las columnas esperadas
        expected_columns = [
            "Nº Orden", 
            "Fecha", 
            "Cliente", 
            "Precio Total", 
            "Estado", 
            "Acciones"
        ]
        
        # Buscar encabezados de tabla de diferentes formas (más flexible)
        for column_name in expected_columns:
            # Buscar por texto exacto o parcial en elementos th o con role columnheader
            column_header = page.locator(f"th:has-text('{column_name}'), [role='columnheader']:has-text('{column_name}')")
            expect(column_header).to_be_visible(timeout=10000)
            
    def test_orders_table_has_data(self, page: Page, base_url: str):
        """
        Verificar que hay al menos 1 orden visible en la tabla
        """
        page.goto(f"{base_url}/orders")
        
        # Esperar a que los datos se carguen
        page.wait_for_load_state("networkidle")
        
        # Verificar que existe al menos una fila de datos (excluyendo el header)
        # Buscar diferentes tipos de filas de tabla
        data_rows = page.locator("tbody tr, [role='row']:not([role='row']:first-child)")
        expect(data_rows.first()).to_be_visible(timeout=15000)
        
        # Verificar que hay al menos una orden
        orders_count = data_rows.count()
        assert orders_count >= 1, f"Se esperaba al menos 1 orden, pero se encontraron {orders_count}"
        
    def test_table_rows_have_complete_data(self, page: Page, base_url: str):
        """
        Verificar que cada fila tiene datos completos (no campos vacíos)
        """
        page.goto(f"{base_url}/orders")
        page.wait_for_load_state("networkidle")
        
        # Obtener todas las filas de datos
        data_rows = page.locator("tbody tr, [role='row']:not([role='row']:first-child)")
        rows_count = data_rows.count()
        
        # Verificar cada fila individualmente
        for i in range(min(rows_count, 5)):  # Limitar a las primeras 5 filas por performance
            row = data_rows.nth(i)
            expect(row).to_be_visible()
            
            # Verificar que la fila contiene datos (no está completamente vacía)
            row_text = row.inner_text()
            assert len(row_text.strip()) > 0, f"La fila {i+1} está vacía"
            
            # Verificar que no hay campos con texto "N/A", "-", o completamente vacíos
            # en las celdas críticas (número de orden, fecha, cliente, precio)
            cells = row.locator("td")
            cells_count = cells.count()
            
            if cells_count >= 4:  # Asegurar que hay al menos las columnas básicas
                # Número de orden (primera columna)
                order_number_cell = cells.nth(0)
                order_number_text = order_number_cell.inner_text().strip()
                assert order_number_text and order_number_text not in ["", "-", "N/A"], \
                    f"Número de orden vacío en fila {i+1}"
                
                # Fecha (segunda columna)  
                date_cell = cells.nth(1)
                date_text = date_cell.inner_text().strip()
                assert date_text and date_text not in ["", "-", "N/A"], \
                    f"Fecha vacía en fila {i+1}"
                
                # Cliente (tercera columna)
                client_cell = cells.nth(2)
                client_text = client_cell.inner_text().strip()
                assert client_text and client_text not in ["", "-", "N/A"], \
                    f"Cliente vacío en fila {i+1}"
                
                # Precio (cuarta columna)
                price_cell = cells.nth(3)
                price_text = price_cell.inner_text().strip()
                assert price_text and price_text not in ["", "-", "N/A"], \
                    f"Precio vacío en fila {i+1}"

    def test_page_responsive_design(self, page: Page, base_url: str):
        """
        Verificar que la página es responsive y funciona en diferentes tamaños
        """
        page.goto(f"{base_url}/orders")
        
        # Probar en diferentes viewports
        viewports = [
            {"width": 1920, "height": 1080},  # Desktop
            {"width": 768, "height": 1024},   # Tablet
            {"width": 375, "height": 667}     # Mobile
        ]
        
        for viewport in viewports:
            page.set_viewport_size(viewport)
            page.wait_for_load_state("networkidle")
            
            # Verificar que la tabla sigue siendo visible y funcional
            table = page.locator("table, [data-testid='orders-table']")
            expect(table).to_be_visible(timeout=5000)
            
            # En móvil, la tabla podría tener scroll horizontal o ser colapsable
            if viewport["width"] <= 768:
                # Verificar que el contenido no se corta completamente
                page_content = page.locator("body")
                expect(page_content).to_be_visible()