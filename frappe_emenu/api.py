import frappe

@frappe.whitelist()
def get_product_by_category():
    category = frappe.db.sql("""
        SELECT
            name,
            category_name,
            sort_order
        FROM `tabProduct Category`
        WHERE published = 1
        ORDER BY sort_order ASC
    """, as_dict=1)

    for cat in category:
        cat["products"] = frappe.db.sql("""
            SELECT
                name,
                product_name,
                price,
                installment_price,
                photo_1,
                photo_2,
                photo_3,
                photo_4,
                photo_5,
				sort_order
            FROM `tabProducts`
            WHERE category = %s
            AND published = 1
			ORDER BY sort_order ASC
        """, cat["name"], as_dict=1)

    return category
