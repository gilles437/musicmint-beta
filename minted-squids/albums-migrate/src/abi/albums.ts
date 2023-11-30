import {Abi, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0x4c6b58b8292ff6c7b7ec621d14a507f3663d1ea29d92c1e6ffc67030415d9956",
    "language": "ink! 4.3.0",
    "compiler": "rustc 1.76.0-nightly",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "3.2.0",
      "rust_toolchain": "nightly-x86_64-apple-darwin",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "albums",
    "version": "0.1.0",
    "authors": [
      "Allfeat labs <tech@allfeat.com>"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "base_uri",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 9
            }
          },
          {
            "label": "owner",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 2
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "new",
        "payable": true,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 10
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [
      " Possible design for ipfs storage",
      " ```json",
      " {",
      "    \"album\": {",
      "      \"id\": \"AlbumId\",",
      "      \"title\": \"Album title\",",
      "      \"description\": \"Song description\",",
      "      \"artists\":  [\"Main artist\", \"Artist 2\", \"Artist 3\"],",
      "      \"cover\": \"ipfs://Qm.../cover.jpg\",",
      "      \"price\": \"0.1\",",
      "    }",
      " }",
      "",
      " {",
      "   \"song\": {",
      "       \"id\": \"SongId\",",
      "       \"title\": \"Song title\",",
      "       \"description\": \"Song description\",",
      "       \"image\": \"ipfs://Qm.../cover.jpg\",",
      "       \"audio\": \"ipfs://Qm.../audio.mp3\",",
      "       \"price\": \"0.1\"",
      "     }",
      " }",
      " ```"
    ],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 2
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 0
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 1
      },
      "chainExtension": {
        "displayName": [
          "ChainExtension"
        ],
        "type": 40
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 39
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 19
      }
    },
    "events": [
      {
        "args": [
          {
            "docs": [
              " The artist."
            ],
            "indexed": false,
            "label": "from",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 2
            }
          },
          {
            "docs": [
              " Album id."
            ],
            "indexed": false,
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "docs": [
              " Song id."
            ],
            "indexed": false,
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          },
          {
            "docs": [
              " Max supply of the creation."
            ],
            "indexed": false,
            "label": "max_supply",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "docs": [
              " The URI of the creation."
            ],
            "indexed": false,
            "label": "uri",
            "type": {
              "displayName": [
                "URI"
              ],
              "type": 5
            }
          },
          {
            "docs": [
              " The price of the creation."
            ],
            "indexed": false,
            "label": "price",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          "Event emitted when an artist creates a song or an album."
        ],
        "label": "ItemCreated"
      },
      {
        "args": [
          {
            "docs": [
              " Album id."
            ],
            "indexed": false,
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "docs": [
              " Song id."
            ],
            "indexed": false,
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          }
        ],
        "docs": [
          "Event emitted when an artist deletes an album or a song."
        ],
        "label": "ItemDeleted"
      },
      {
        "args": [
          {
            "docs": [
              " The artist."
            ],
            "indexed": false,
            "label": "from",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 2
            }
          },
          {
            "docs": [
              " The fan."
            ],
            "indexed": false,
            "label": "to",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 2
            }
          },
          {
            "docs": [
              " Album id."
            ],
            "indexed": false,
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "docs": [
              " Song id."
            ],
            "indexed": false,
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          }
        ],
        "docs": [
          "Event emitted when a user mints a creation (song or album)."
        ],
        "label": "ItemMinted"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 11
    },
    "messages": [
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Denies an ID from being used."
        ],
        "label": "deny",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x9117e1d3"
      },
      {
        "args": [
          {
            "label": "max_supply",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "label": "price",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "label": "album_uri",
            "type": {
              "displayName": [
                "URI"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [
          " Creates an album."
        ],
        "label": "create_album",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0xc9fd7a55"
      },
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "label": "max_supply",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "label": "price",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          },
          {
            "label": "song_uri",
            "type": {
              "displayName": [
                "URI"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [
          " Creates a song within an album."
        ],
        "label": "create_song",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0xe6e12c71"
      },
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Deletes an album."
        ],
        "label": "delete_album",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x06ca4865"
      },
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Deletes a song from an album."
        ],
        "label": "delete_song",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xd4c16804"
      },
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Mintes a new album to the caller."
        ],
        "label": "mint_album",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0xead2d6f3"
      },
      {
        "args": [
          {
            "label": "album_id",
            "type": {
              "displayName": [
                "AlbumId"
              ],
              "type": 8
            }
          },
          {
            "label": "song_id",
            "type": {
              "displayName": [
                "SongId"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Mintes a new song to the caller."
        ],
        "label": "mint_song",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 16
        },
        "selector": "0x79815f7b"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "Ownable::owner",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 21
        },
        "selector": "0x4fa43c8c"
      },
      {
        "args": [
          {
            "label": "new_owner",
            "type": {
              "displayName": [
                "ownable_external",
                "TransferOwnershipInput1"
              ],
              "type": 22
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "Ownable::transfer_ownership",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x11f43efd"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "Ownable::renounce_ownership",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x5e228753"
      },
      {
        "args": [
          {
            "label": "to",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferInput2"
              ],
              "type": 18
            }
          },
          {
            "label": "value",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferInput3"
              ],
              "type": 0
            }
          },
          {
            "label": "data",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferInput4"
              ],
              "type": 20
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::transfer",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x385cc204"
      },
      {
        "args": [
          {
            "label": "owner",
            "type": {
              "displayName": [
                "aft37_external",
                "BalanceOfInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "BalanceOfInput2"
              ],
              "type": 28
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::balance_of",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 29
        },
        "selector": "0xae8acf6f"
      },
      {
        "args": [
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "TotalSupplyInput1"
              ],
              "type": 28
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::total_supply",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 29
        },
        "selector": "0x65ad2f93"
      },
      {
        "args": [
          {
            "label": "owner",
            "type": {
              "displayName": [
                "aft37_external",
                "AllowanceInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "operator",
            "type": {
              "displayName": [
                "aft37_external",
                "AllowanceInput2"
              ],
              "type": 2
            }
          },
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "AllowanceInput3"
              ],
              "type": 28
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::allowance",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 29
        },
        "selector": "0x893600ca"
      },
      {
        "args": [
          {
            "label": "from",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferFromInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "to",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferFromInput2"
              ],
              "type": 2
            }
          },
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferFromInput3"
              ],
              "type": 18
            }
          },
          {
            "label": "amount",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferFromInput4"
              ],
              "type": 0
            }
          },
          {
            "label": "data",
            "type": {
              "displayName": [
                "aft37_external",
                "TransferFromInput5"
              ],
              "type": 20
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::transfer_from",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x842da239"
      },
      {
        "args": [
          {
            "label": "operator",
            "type": {
              "displayName": [
                "aft37_external",
                "ApproveInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37_external",
                "ApproveInput2"
              ],
              "type": 28
            }
          },
          {
            "label": "value",
            "type": {
              "displayName": [
                "aft37_external",
                "ApproveInput3"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37::approve",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0xc432e7a4"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "AFT37URIStorage::base_uri",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 30
        },
        "selector": "0xadff9bda"
      },
      {
        "args": [
          {
            "label": "token_id",
            "type": {
              "displayName": [
                "aft37uristorage_external",
                "TokenUriInput1"
              ],
              "type": 18
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37URIStorage::token_uri",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 31
        },
        "selector": "0x7fd773dc"
      },
      {
        "args": [
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "MaxSupplyInput1"
              ],
              "type": 18
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::max_supply",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 33
        },
        "selector": "0xa7da8816"
      },
      {
        "args": [
          {
            "label": "to",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "MintInput1"
              ],
              "type": 2
            }
          },
          {
            "label": "ids_amounts",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "MintInput2"
              ],
              "type": 35
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::mint",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x9a629f37"
      },
      {
        "args": [
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "SetMaxSupplyInput1"
              ],
              "type": 18
            }
          },
          {
            "label": "max_supply",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "SetMaxSupplyInput2"
              ],
              "type": 1
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::set_max_supply",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x2af98e53"
      },
      {
        "args": [
          {
            "label": "id",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "SetPriceInput1"
              ],
              "type": 18
            }
          },
          {
            "label": "price",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "SetPriceInput2"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::set_price",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0xc5317b9a"
      },
      {
        "args": [
          {
            "label": "token_id",
            "type": {
              "displayName": [
                "aft37payablemint_external",
                "PriceInput1"
              ],
              "type": 18
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::price",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 37
        },
        "selector": "0x0b76ebea"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "AFT37PayableMint::withdraw",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x0698a062"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x0a4b80c5",
                              "ty": 0
                            }
                          },
                          "root_key": "0x0a4b80c5"
                        }
                      },
                      "name": "balances"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xcc564137",
                              "ty": 0
                            }
                          },
                          "root_key": "0xcc564137"
                        }
                      },
                      "name": "supply"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xe5cd90b7",
                              "ty": 0
                            }
                          },
                          "root_key": "0xe5cd90b7"
                        }
                      },
                      "name": "operator_approvals"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "data"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xbf61d539",
                              "ty": 0
                            }
                          },
                          "root_key": "0xbf61d539"
                        }
                      },
                      "name": "price_per_mint"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xae3ff2dd",
                              "ty": 1
                            }
                          },
                          "root_key": "0xae3ff2dd"
                        }
                      },
                      "name": "max_supply"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "payable_mint"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "enum": {
                              "dispatchKey": "0x6f713913",
                              "name": "Option",
                              "variants": {
                                "0": {
                                  "fields": [],
                                  "name": "None"
                                },
                                "1": {
                                  "fields": [
                                    {
                                      "layout": {
                                        "leaf": {
                                          "key": "0x6f713913",
                                          "ty": 2
                                        }
                                      },
                                      "name": "0"
                                    }
                                  ],
                                  "name": "Some"
                                }
                              }
                            }
                          },
                          "root_key": "0x6f713913"
                        }
                      },
                      "name": "owner"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "ownable"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 5
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "base_uri"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x13d7a99a",
                              "ty": 5
                            }
                          },
                          "root_key": "0x13d7a99a"
                        }
                      },
                      "name": "token_uris"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "uris"
            },
            {
              "layout": {
                "root": {
                  "layout": {
                    "leaf": {
                      "key": "0xe04d5c93",
                      "ty": 6
                    }
                  },
                  "root_key": "0xe04d5c93"
                }
              },
              "name": "denied_ids"
            },
            {
              "layout": {
                "root": {
                  "layout": {
                    "leaf": {
                      "key": "0x68362963",
                      "ty": 7
                    }
                  },
                  "root_key": "0x68362963"
                }
              },
              "name": "songs"
            },
            {
              "layout": {
                "leaf": {
                  "key": "0x00000000",
                  "ty": 8
                }
              },
              "name": "current_album_id"
            }
          ],
          "name": "Contract"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 3,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 4
          }
        }
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "primitive": "str"
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "sequence": {
            "type": 8
          }
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "primitive": "u16"
        }
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 5
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 5
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 13
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 14
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 14
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "NotOwner"
              },
              {
                "index": 1,
                "name": "InvalidAlbumId"
              },
              {
                "index": 2,
                "name": "InvalidSongId"
              },
              {
                "index": 3,
                "name": "DeniedId"
              },
              {
                "fields": [
                  {
                    "type": 15,
                    "typeName": "AFT37Error"
                  }
                ],
                "index": 4,
                "name": "Internal"
              }
            ]
          }
        },
        "path": [
          "albums",
          "albums",
          "Error"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 5,
                    "typeName": "String"
                  }
                ],
                "index": 0,
                "name": "Custom"
              },
              {
                "index": 1,
                "name": "InsufficientBalance"
              },
              {
                "index": 2,
                "name": "TransferToNonSetAddress"
              },
              {
                "index": 3,
                "name": "TokenNotExists"
              },
              {
                "index": 4,
                "name": "NotAllowed"
              },
              {
                "index": 5,
                "name": "SelfApprove"
              },
              {
                "fields": [
                  {
                    "type": 5,
                    "typeName": "String"
                  }
                ],
                "index": 6,
                "name": "SafeTransferCheckFailed"
              }
            ]
          }
        },
        "path": [
          "allfeat_contracts",
          "traits",
          "errors",
          "aft37",
          "AFT37Error"
        ]
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 17
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 17
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 18
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 14
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 18
          },
          {
            "name": "E",
            "type": 14
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 4,
                    "typeName": "u8"
                  }
                ],
                "index": 0,
                "name": "U8"
              },
              {
                "fields": [
                  {
                    "type": 8,
                    "typeName": "u16"
                  }
                ],
                "index": 1,
                "name": "U16"
              },
              {
                "fields": [
                  {
                    "type": 1,
                    "typeName": "u32"
                  }
                ],
                "index": 2,
                "name": "U32"
              },
              {
                "fields": [
                  {
                    "type": 19,
                    "typeName": "u64"
                  }
                ],
                "index": 3,
                "name": "U64"
              },
              {
                "fields": [
                  {
                    "type": 0,
                    "typeName": "u128"
                  }
                ],
                "index": 4,
                "name": "U128"
              },
              {
                "fields": [
                  {
                    "type": 20,
                    "typeName": "Vec<u8>"
                  }
                ],
                "index": 5,
                "name": "Bytes"
              }
            ]
          }
        },
        "path": [
          "allfeat_contracts",
          "traits",
          "types",
          "Id"
        ]
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "sequence": {
            "type": 4
          }
        }
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 22
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 22
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 2
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 24
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 24
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 25
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 25
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 25,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "CallerIsNotOwner"
              },
              {
                "index": 1,
                "name": "NewOwnerIsNotSet"
              }
            ]
          }
        },
        "path": [
          "openbrush_contracts",
          "traits",
          "errors",
          "ownable",
          "OwnableError"
        ]
      }
    },
    {
      "id": 26,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 27
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 27
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 27,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 15
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 28,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 18
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 18
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 29,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 30,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 31,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 32
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 32
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 32,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 15
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 33,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 34
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 34
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 34,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 15
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 35,
      "type": {
        "def": {
          "sequence": {
            "type": 36
          }
        }
      }
    },
    {
      "id": 36,
      "type": {
        "def": {
          "tuple": [
            18,
            0
          ]
        }
      }
    },
    {
      "id": 37,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 38
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 38
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 38,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 15
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 15
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 39,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 3,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 40,
      "type": {
        "def": {
          "variant": {}
        },
        "path": [
          "ink_env",
          "types",
          "NoChainExtension"
        ]
      }
    }
  ],
  "version": "4"
}

const _abi = new Abi(metadata)

export function decodeEvent(hex: string): Event {
    return _abi.decodeEvent(hex)
}

export function decodeMessage(hex: string): Message {
    return _abi.decodeMessage(hex)
}

export function decodeConstructor(hex: string): Constructor {
    return _abi.decodeConstructor(hex)
}

export interface Chain {
    client: {
        call: <T=any>(method: string, params?: unknown[]) => Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(private ctx: ChainContext, private address: string, private blockHash?: string) { }

    Ownable_owner(): Promise<Result<TransferOwnershipInput1, LangError>> {
        return this.stateCall('0x4fa43c8c', [])
    }

    AFT37_balance_of(owner: Uint8Array, id: (Id | undefined)): Promise<Result<bigint, LangError>> {
        return this.stateCall('0xae8acf6f', [owner, id])
    }

    AFT37_total_supply(id: (Id | undefined)): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x65ad2f93', [id])
    }

    AFT37_allowance(owner: Uint8Array, operator: Uint8Array, id: (Id | undefined)): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x893600ca', [owner, operator, id])
    }

    AFT37URIStorage_base_uri(): Promise<Result<(URI | undefined), LangError>> {
        return this.stateCall('0xadff9bda', [])
    }

    AFT37URIStorage_token_uri(token_id: Id): Promise<Result<Result<(URI | undefined), AFT37Error>, LangError>> {
        return this.stateCall('0x7fd773dc', [token_id])
    }

    AFT37PayableMint_max_supply(id: Id): Promise<Result<Result<number, AFT37Error>, LangError>> {
        return this.stateCall('0xa7da8816', [id])
    }

    AFT37PayableMint_price(token_id: Id): Promise<Result<Result<bigint, AFT37Error>, LangError>> {
        return this.stateCall('0x0b76ebea', [token_id])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.client.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Event = Event_ItemCreated | Event_ItemDeleted | Event_ItemMinted

export interface Event_ItemCreated {
    __kind: 'ItemCreated'
    /**
     *  The artist.
     */
    from: Uint8Array
    /**
     *  Album id.
     */
    albumId: number
    /**
     *  Song id.
     */
    songId: number
    /**
     *  Max supply of the creation.
     */
    maxSupply: number
    /**
     *  The URI of the creation.
     */
    uri: URI
    /**
     *  The price of the creation.
     */
    price: bigint
}

export interface Event_ItemDeleted {
    __kind: 'ItemDeleted'
    /**
     *  Album id.
     */
    albumId: number
    /**
     *  Song id.
     */
    songId: number
}

export interface Event_ItemMinted {
    __kind: 'ItemMinted'
    /**
     *  The artist.
     */
    from: Uint8Array
    /**
     *  The fan.
     */
    to: Uint8Array
    /**
     *  Album id.
     */
    albumId: number
    /**
     *  Song id.
     */
    songId: number
}

export type Message = Message_deny | Message_create_album | Message_create_song | Message_delete_album | Message_delete_song | Message_mint_album | Message_mint_song | Message_Ownable_owner | Message_Ownable_transfer_ownership | Message_Ownable_renounce_ownership | Message_AFT37_transfer | Message_AFT37_balance_of | Message_AFT37_total_supply | Message_AFT37_allowance | Message_AFT37_transfer_from | Message_AFT37_approve | Message_AFT37URIStorage_base_uri | Message_AFT37URIStorage_token_uri | Message_AFT37PayableMint_max_supply | Message_AFT37PayableMint_mint | Message_AFT37PayableMint_set_max_supply | Message_AFT37PayableMint_set_price | Message_AFT37PayableMint_price | Message_AFT37PayableMint_withdraw

/**
 *  Denies an ID from being used.
 */
export interface Message_deny {
    __kind: 'deny'
    albumId: number
    songId: number
}

/**
 *  Creates an album.
 */
export interface Message_create_album {
    __kind: 'create_album'
    maxSupply: number
    price: bigint
    albumUri: URI
}

/**
 *  Creates a song within an album.
 */
export interface Message_create_song {
    __kind: 'create_song'
    albumId: number
    maxSupply: number
    price: bigint
    songUri: URI
}

/**
 *  Deletes an album.
 */
export interface Message_delete_album {
    __kind: 'delete_album'
    albumId: number
}

/**
 *  Deletes a song from an album.
 */
export interface Message_delete_song {
    __kind: 'delete_song'
    albumId: number
    songId: number
}

/**
 *  Mintes a new album to the caller.
 */
export interface Message_mint_album {
    __kind: 'mint_album'
    albumId: number
}

/**
 *  Mintes a new song to the caller.
 */
export interface Message_mint_song {
    __kind: 'mint_song'
    albumId: number
    songId: number
}

export interface Message_Ownable_owner {
    __kind: 'Ownable_owner'
}

export interface Message_Ownable_transfer_ownership {
    __kind: 'Ownable_transfer_ownership'
    newOwner: TransferOwnershipInput1
}

export interface Message_Ownable_renounce_ownership {
    __kind: 'Ownable_renounce_ownership'
}

export interface Message_AFT37_transfer {
    __kind: 'AFT37_transfer'
    to: Uint8Array
    id: Id
    value: bigint
    data: Uint8Array
}

export interface Message_AFT37_balance_of {
    __kind: 'AFT37_balance_of'
    owner: Uint8Array
    id: (Id | undefined)
}

export interface Message_AFT37_total_supply {
    __kind: 'AFT37_total_supply'
    id: (Id | undefined)
}

export interface Message_AFT37_allowance {
    __kind: 'AFT37_allowance'
    owner: Uint8Array
    operator: Uint8Array
    id: (Id | undefined)
}

export interface Message_AFT37_transfer_from {
    __kind: 'AFT37_transfer_from'
    from: Uint8Array
    to: Uint8Array
    id: Id
    amount: bigint
    data: Uint8Array
}

export interface Message_AFT37_approve {
    __kind: 'AFT37_approve'
    operator: Uint8Array
    id: (Id | undefined)
    value: bigint
}

export interface Message_AFT37URIStorage_base_uri {
    __kind: 'AFT37URIStorage_base_uri'
}

export interface Message_AFT37URIStorage_token_uri {
    __kind: 'AFT37URIStorage_token_uri'
    tokenId: Id
}

export interface Message_AFT37PayableMint_max_supply {
    __kind: 'AFT37PayableMint_max_supply'
    id: Id
}

export interface Message_AFT37PayableMint_mint {
    __kind: 'AFT37PayableMint_mint'
    to: Uint8Array
    idsAmounts: MintInput2
}

export interface Message_AFT37PayableMint_set_max_supply {
    __kind: 'AFT37PayableMint_set_max_supply'
    id: Id
    maxSupply: number
}

export interface Message_AFT37PayableMint_set_price {
    __kind: 'AFT37PayableMint_set_price'
    id: Id
    price: bigint
}

export interface Message_AFT37PayableMint_price {
    __kind: 'AFT37PayableMint_price'
    tokenId: Id
}

export interface Message_AFT37PayableMint_withdraw {
    __kind: 'AFT37PayableMint_withdraw'
}

export type Constructor = Constructor_new

export interface Constructor_new {
    __kind: 'new'
    baseUri: (URI | undefined)
    owner: Uint8Array
}

export type TransferOwnershipInput1 = (Uint8Array | undefined)

export type LangError = LangError_CouldNotReadInput

export interface LangError_CouldNotReadInput {
    __kind: 'CouldNotReadInput'
}

export type Id = Id_U8 | Id_U16 | Id_U32 | Id_U64 | Id_U128 | Id_Bytes

export interface Id_U8 {
    __kind: 'U8'
    value: number
}

export interface Id_U16 {
    __kind: 'U16'
    value: number
}

export interface Id_U32 {
    __kind: 'U32'
    value: number
}

export interface Id_U64 {
    __kind: 'U64'
    value: bigint
}

export interface Id_U128 {
    __kind: 'U128'
    value: bigint
}

export interface Id_Bytes {
    __kind: 'Bytes'
    value: Uint8Array
}

export type URI = string

export type AFT37Error = AFT37Error_Custom | AFT37Error_InsufficientBalance | AFT37Error_TransferToNonSetAddress | AFT37Error_TokenNotExists | AFT37Error_NotAllowed | AFT37Error_SelfApprove | AFT37Error_SafeTransferCheckFailed

export interface AFT37Error_Custom {
    __kind: 'Custom'
    value: URI
}

export interface AFT37Error_InsufficientBalance {
    __kind: 'InsufficientBalance'
}

export interface AFT37Error_TransferToNonSetAddress {
    __kind: 'TransferToNonSetAddress'
}

export interface AFT37Error_TokenNotExists {
    __kind: 'TokenNotExists'
}

export interface AFT37Error_NotAllowed {
    __kind: 'NotAllowed'
}

export interface AFT37Error_SelfApprove {
    __kind: 'SelfApprove'
}

export interface AFT37Error_SafeTransferCheckFailed {
    __kind: 'SafeTransferCheckFailed'
    value: URI
}

export type MintInput2 = [Id, bigint][]

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
