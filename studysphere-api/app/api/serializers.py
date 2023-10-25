from django.urls import reverse
from rest_framework import serializers
from .models import (
    Room, Message, Topic,
    UserAccount)

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["id", "username", "email"]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"
        lookup_field="name"


class RoomWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ["slug", "participants", "host", "name", "description", "topic"]
        lookup_field="slug"
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class RoomReadSerializer(DynamicFieldsModelSerializer):
    host = UserSerializer()
    participants = UserSerializer(many=True)
    topic = TopicSerializer()
    
    class Meta:
        model = Room
        fields = "__all__"
        lookup_field="slug"
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class MessageSerializer(serializers.ModelSerializer):
    # room = RoomReadSerializer(fields=['slug', 'name'], read_only=True)
    # user = UserSerializer(fields=['username'], read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'user', 'room', 'body', 'created']
