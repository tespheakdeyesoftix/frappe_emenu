# Copyright (c) 2026, Tes Pheakdey and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class BusinessInformation(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		address: DF.SmallText | None
		business_hour: DF.Data | None
		business_name: DF.Data | None
		choose_template: DF.Literal["Default", "Template1"]
		contact_name: DF.Data | None
		facebook: DF.Data | None
		hero_intro: DF.SmallText | None
		hero_photo: DF.AttachImage | None
		hero_title: DF.Data | None
		phone_number1: DF.Data | None
		phone_number: DF.Data | None
		photo: DF.AttachImage | None
		placeholder_image: DF.AttachImage | None
		show_hero_section: DF.Check
		slogan: DF.Data | None
		slogan_1: DF.Data | None
		slogan_2: DF.Data | None
		sub_domain_name: DF.Data | None
		telegram: DF.Data | None
		tik_tok: DF.Data | None
	# end: auto-generated types

	pass
