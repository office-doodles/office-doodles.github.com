---
---
var images = [
    {% for post in site.posts %}{slug: '{{ post.slug }}', title: '{{ post.title }}', date: '{{ post.date | date_to_long_string }}'}{% unless forloop.last %},{% endunless %}
    {% endfor %}
]

