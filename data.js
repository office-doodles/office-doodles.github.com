---
---
var images = [
    {% for post in site.posts %}{slug: '{{ post.slug }}', title: '{{ post.title }}', date: '{{ post.date | date_to_long_string }}', office: '{{ post.office }}', by: '{{ post.by }}'}{% unless forloop.last %},{% endunless %}
    {% endfor %}
]

