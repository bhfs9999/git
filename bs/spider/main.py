#coding=utf-8
import urllib
import urllib2

import BeautifulSoup

import MySQLdb

def connDb():
    db = MySQLdb.connect("localhost", "root", "1234", "news_site")
    return db

urls = {u"国内": "http://www.people.com.cn/rss/politics.xml",
        u"国际": "http://www.people.com.cn/rss/world.xml",
        u"经济": "http://www.people.com.cn/rss/finance.xml",
        u"体育": "http://www.people.com.cn/rss/sports.xml",
        u"教育": "http://www.people.com.cn/rss/edu.xml",
        u"游戏": "http://www.people.com.cn/rss/game.xml",}

db = connDb()
db.set_character_set('utf8')
cursor = db.cursor()
    
for cate, url in urls.items():
    request = urllib2.Request(url)
    response = urllib2.urlopen(url)
    content = response.read()

    soup = BeautifulSoup.BeautifulSoup(content)
    all_news = soup.findAll("item")
    for news in all_news:
        try:
            title = news.title.string
        except:
            continue

        link = news.contents[4]

        try:
            date = news.pubdate.string
        except:
            continue
            
        try:
            author = news.author.string
        except:
            author = "null"

        try:
            description = news.description.string
        except:
            continue

        if len(description) > 5000:
            continue
        origin = u'人民网'

        sql = u"insert into news_site.news (title, link, date, author, description, origin, cate) values('" + \
                title + "','" + link + "','" + date + "','" + author + "','" + description + "','" + origin +  "','" + cate + "');"
        try:
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
            print "Insert failed, pass!"
        else:
            print "Insert success! Title: " + title

db.close()

# file = open("news.xml", "wb+")
# file.write(content)
