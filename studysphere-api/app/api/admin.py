from django.contrib import admin

from .models import UserAccount
# Register your models here.
from .models import Room


class RoomAdmin(admin.ModelAdmin):
    fields = ['name', 'slug', 'description']
    list_display = ['id', 'name', 'slug', 'created', 'description', 'updated']
    search_fields = ['name', 'description']
    raw_id_fields = ['host']

admin.site.register(UserAccount)
admin.site.register(Room)
