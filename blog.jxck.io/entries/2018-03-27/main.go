package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/binary"
	"encoding/pem"
	"io/ioutil"
	"log"
	"os"
)

func init() {
	log.SetFlags(log.Lshortfile)
}

var p = log.Println

func main() {
	// fullchain.pem を読み込む
	path := os.Args[1]
	file, _ := ioutil.ReadFile(path)

	// チェインの各証明書をデコード
	var chain []*pem.Block
	for {
		var block *pem.Block
		block, file = pem.Decode(file)
		if block == nil {
			break
		}
		chain = append(chain, block)
	}

	// enum { v1(0), (255) } Version;
	type Version uint8
	var v1 Version = 0

	// enum { timestamped_entry(0), (255) } MerkleLeafType;
	type MerkleLeafType uint8
	var timestamped_entry MerkleLeafType = 0

	// timestamp
	var timestamp uint64 = 1520467826187

	// enum { x509_entry(0), precert_entry(1), (65535) } LogEntryType;
	type LogEntryType uint16
	var x509_entry LogEntryType = 0

	buf := bytes.NewBuffer([]byte{})

	// prefix
	var prefix uint8 = 0
	binary.Write(buf, binary.BigEndian, prefix)

	// MerkleTreeLeaf
	binary.Write(buf, binary.BigEndian, v1)
	binary.Write(buf, binary.BigEndian, timestamped_entry)

	// TimestampedEntry
	binary.Write(buf, binary.BigEndian, timestamp)
	binary.Write(buf, binary.BigEndian, x509_entry)

	// opaque ASN.1Cert<1..2^24-1>;
	// 24bit length
	var certlen uint32 = uint32(len(chain[0].Bytes))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>16&255))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>8&255))
	binary.Write(buf, binary.BigEndian, uint8(certlen>>0&255))
	// cert
	binary.Write(buf, binary.BigEndian, chain[0].Bytes)

	// opaque CtExtensions<0..2^16-1>;
	var extension uint16 = 0
	binary.Write(buf, binary.BigEndian, extension)
	p(len(buf.Bytes()), buf.Bytes())

	// MTH({d(0)}) = SHA-256(0x00 || d(0)).
	// prefix=0x00 はすでに加えてある
	hash := sha256.Sum256(buf.Bytes())
	log.Printf("%x", hash)

	p(base64.URLEncoding.EncodeToString(hash[:]))

	// この hash をつけてリクエスト
	p("curl 'https://ct.googleapis.com/rocketter/ct/v1/get-proof-by-hash?hash=xxx&tree_size=yyy'")
}
