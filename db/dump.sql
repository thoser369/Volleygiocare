drop database if exists VolleyGiocare;
create database VolleyGiocare;
use VolleyGiocare;

create table partita (
ID integer unsigned not null auto_increment primary key,
nome varchar(255) not null,
data_partita date not null,
ora_partita date not null,
luogo varchar (255) not null,
numero_giocatori int not null,
tipo_partita enum ('beach' , 'volley')
) ;

create table giocatore (
ID integer unsigned not null auto_increment primary key,
nome varchar(255) not null,
cognome varchar(255) not null,
email varchar(255) not null,
ruolo_preferito enum  ('libero', 'centrale' , 'martello' , 'palleggiatore', 'opposto') default null,
password varchar(255) not null,
data_nascita date not null,
telefono varchar(255) default null,
media_feedback int not null

);

create table feedback (
ID integer unsigned not null auto_increment primary key,
ID_giocatore int unsigned not null,
commento varchar(255),
voto enum ('1', '2', '3', '4', '5'),
constraint ID_giocatore foreign key (ID_giocatore) references giocatore(ID)

);


create table partecipazione (
ID integer unsigned not null auto_increment primary key,
ID_partita integer unsigned not null,
ID_giocatore integer unsigned not null,
constraint ID_partita foreign key (ID_partita) references partita(ID),
constraint ID_partecipante foreign key (ID_giocatore) references giocatore(ID)
);

