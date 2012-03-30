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

    slug = raw_input('Slug [{0}]: '.format(slug)) or slug
    office = raw_input('Office [{office}]: '.format(**settings)) or settings['office']
    taken_by = raw_input('Taken by [{taken_by}]: '.format(**settings)) or settings['taken_by']
    author = raw_input('Author [{author}]: '.format(**settings)) or settings['author']

    filename = os.path.join('_posts', today.strftime('%Y-%m-%d-') + slug + '.md' )
    with open(filename, 'w') as f:
        f.write("""---
layout: post
slug: {slug}
title: {title}
office: {office}
by: {taken_by}
author: {author}
---""".format(**locals()))

    print '"{0}" written'.format(filename)
    subprocess.call('git add ' + filename + ' images/' + slug + '.jpg', shell=True)
    subprocess.call('git commit -m \'%s added.\'' % title, shell=True)
    subprocess.call('git push', shell=True)

    write_settings(settings)


if __name__ == '__main__':
    main()
