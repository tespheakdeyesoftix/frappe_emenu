# Copyright (c) 2026, Tes Pheakdey and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Products(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		category: DF.Link | None
		description: DF.TextEditor | None
		photo: DF.AttachImage | None
		photo_1: DF.AttachImage | None
		photo_2: DF.AttachImage | None
		photo_3: DF.AttachImage | None
		photo_4: DF.AttachImage | None
		photo_5: DF.AttachImage | None
		price: DF.Currency
		product_code: DF.Data | None
		product_name: DF.Data | None
	# end: auto-generated types

	pass
