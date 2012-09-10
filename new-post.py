#!/usr/bin/env python

import sys
import os
import datetime
import subprocess

SETTINGS_FILE = '~/.office-doodles'

DEFAULT_SETTINGS = dict(
    office='Moscow, Yandex',
    taken_by='Alexander Artemenko',
    author='',
)


def read_settings():
    filename = os.path.expanduser(SETTINGS_FILE)
    if os.path.exists(filename):
        with open(filename) as f:
            return dict(
                map(lambda x: x.strip(), line.split(':', 1))
                for line in f.readlines()
            )
    return DEFAULT_SETTINGS

def write_settings(settings):
    with open(os.path.expanduser(SETTINGS_FILE), 'w') as f:
        f.write('\n'.join('%s: %s' % item for item in settings.items()))


def main():

    if len(sys.argv) != 2:
        print >> sys.stderr, 'Usage: %s "Image Title"' % sys.argv[0]
        sys.exit(1)

    settings = read_settings()

    title = sys.argv[1]
    slug = '-'.join(title.lower().split())
    today = datetime.date.today()

    slug = input('Slug [{0}]: '.format(slug)) or slug

    image_filename = os.path.join('images', '%s.jpg' % slug)

    if not os.path.isfile(image_filename):
        print("Image %s not found!" % image_filename)
        sys.exit(1)

    office = input('Office [{office}]: '.format(**settings))
    if not office:
        office = settings['office']

    taken_by = input('Taken by [{taken_by}]: '.format(**settings))
    if not taken_by:
        taken_by = settings['taken_by']

    author = input('Author [{author}]: '.format(**settings))
    if not author:
        author = settings['author']

    filename = os.path.join('_posts', '%s-%s.md' % (
        today.strftime('%Y-%m-%d'),
        slug
    ))

    with open(filename, 'w') as f:
        f.write('\n'.join([
            "---",
            "layout: post",
            "slug: %s" % slug,
            "title: %s" % title,
            "office: %s" % office,
            "by: %s" % taken_by,
            "author: %s" % author,
            "---"
        ]))

    print('"{0}" written'.format(filename))

    subprocess.call(['git', 'add', filename, image_filename])
    subprocess.call(['git', 'commit', '-m', '%s added.' % title])
    subprocess.call(['git', 'push'])

    write_settings(settings)


if __name__ == '__main__':
    main()
