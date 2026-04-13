# Copyright (c) 2026, Tes Pheakdey and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Products(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.
	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		business_name: DF.Link | None
		category: DF.Link | None
		category_name: DF.Data | None
		description: DF.TextEditor | None
		installment_price: DF.Currency
		is_feature: DF.Check
		photo: DF.AttachImage | None
		photo_1: DF.AttachImage | None
		photo_2: DF.AttachImage | None
		photo_3: DF.AttachImage | None
		photo_4: DF.AttachImage | None
		photo_5: DF.AttachImage | None
		price: DF.Currency
		product_code: DF.Data | None
		product_name: DF.Data | None
		published: DF.Check
		sort_order: DF.Int
	# end: auto-generated types


	def before_save(self):
		self._old_category = self.get_db_value("category")	

	def after_insert(self):
		if self.category:
			self.update_total_products(self.category)

	def on_update(self):
		old_category = getattr(self, "_old_category", None)
		new_category = self.category

		if old_category and old_category != new_category:
			self.update_total_products(old_category)

		if new_category:
			self.update_total_products(new_category)

	def on_trash(self):
		if self.category:
			self.update_total_products(self.category)

	def update_total_products(self, category):
		total = frappe.db.count("Products", {"category": category, "published": 1})
		frappe.db.set_value(
			"Product Category",
			category,
			"total_products",
			total
		)


	



