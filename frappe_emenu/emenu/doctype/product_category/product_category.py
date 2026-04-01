# Copyright (c) 2026, Tes Pheakdey and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ProductCategory(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		category_name: DF.Data | None
		description: DF.TextEditor | None
		photo: DF.AttachImage | None
		published: DF.Check
		total_products: DF.Int
	# end: auto-generated types

	pass
