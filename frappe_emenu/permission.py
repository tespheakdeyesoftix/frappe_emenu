# my_app/permissions.py

import frappe
 

def get_subdomain():
    host = frappe.local.request.host  # estccoffee.aagj7.com
    subdomain = host.split('.')[0]    # estccoffee
    return subdomain

def product_permission(user):
    
    if not user =="Administrator":
        business_name  = get_subdomain()
        return """(`tabProducts`.business_name  = '{}')""".format(business_name)

