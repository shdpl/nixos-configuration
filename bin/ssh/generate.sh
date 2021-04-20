if [ $# != 1 ];
then echo "Usage: $0 key_id"; exit 1;
fi

ROOT=$PWD
ssh-keygen -N "" -t ed25519 -f $ROOT/private/ssh/$1
mv $ROOT/private/ssh/$1.pub $ROOT/data/ssh/$1.pub

echo "Private Key: $ROOT/private/ssh/$1"
echo "Public Key: $ROOT/data/ssh/$1.pub"
