#!/bin/sh

i3status | while :
do
	read line
	price=`curl -s https://api.coinbase.com/v2/prices/spot?currency=PLN | jq -r .data.amount`
	echo "$price | $line" || exit 1
done
