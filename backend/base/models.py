from django.db import models
from django.contrib.auth.models import User
import os
import random
from django.core.validators import MinValueValidator

# Create your models here.
def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)


class Building(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    slots = models.IntegerField(null=True, blank=True, default=0, validators=[MinValueValidator(0)])
    totalSlots = models.IntegerField(null=True, blank=True, default=0, validators=[MinValueValidator(0)])
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    